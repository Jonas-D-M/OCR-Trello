import { useNavigation } from '@react-navigation/core';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SectionList,
  Image,
  AppState,
  AppStateStatus,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CTA from '../../Components/CTA';
import Button from '../../Components/Button';
import { addBoards, logOut } from '../../Redux/Actions';
import { sections } from '../../Styles/components';
import { IBoard } from '../../Types/boards';
import trello from '../../Utils/trello';
import Error from '../../Components/Error';
import { neutral, theme } from '../../Styles/colors';

interface ItemProps {
  object: IBoard;
}

interface BoardsWithStarProps {
  boards: Array<IBoard>;
}

const BoardsWithStar: FunctionComponent<BoardsWithStarProps> = ({ boards }) => {
  useEffect(() => {
    console.log(boards.length);
  }, [boards]);
  return (
    // <View>
    //   <Text style={sections.sectionHeader}>Borden met ster</Text>
    //   {boards.map((board) => (
    //     <TouchableOpacity>

    //     </TouchableOpacity>
    //   ))}
    // </View>
    <></>
  );
};

const Item: FunctionComponent<ItemProps> = ({ object }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Board', {
      title: object.name,
      object,
      color: object.prefs.backgroundColor,
    });
  };

  return (
    <TouchableOpacity style={sections.itemContainer} onPress={handlePress}>
      {!object.prefs.backgroundImage ? (
        <View
          style={[
            sections.itemSquare,
            { backgroundColor: object.prefs.backgroundColor },
          ]}
        />
      ) : (
        <Image
          style={sections.itemSquare}
          source={{ uri: object.prefs.backgroundImageScaled[0].url }}
        />
      )}
      <Text style={sections.itemTitle}>{object.name}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const [data, setData] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const dispatch = useDispatch();

  //@ts-ignore
  const { user, ui } = useSelector((state) => state);

  const fetchboards = async () => {
    console.log('====================================');
    console.log('fetching boards');
    console.log('====================================');
    setRefreshing(true);
    const boards = await trello.boards();
    console.log(boards);

    if (boards) {
      dispatch(addBoards(boards));
      setData(trello.groupBoards(boards));
    }
    setRefreshing(false);
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      await trello.createPushNotifications();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    fetchboards();
  }, []);

  return (
    <View style={{ backgroundColor: neutral['200'] }}>
      <SectionList
        // ListHeaderComponent={<BoardsWithStar boards={data[1].data} />}
        sections={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <Item object={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={sections.sectionHeader}>{title}</Text>
        )}
        refreshing={refreshing}
        onRefresh={fetchboards}
      />
      <CTA />
      {ui.error && <Error />}
    </View>
  );
};

export default Home;
