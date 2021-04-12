import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { pagination } from "../../Styles/components";
import Dot from "./Dot";

interface PaginationProps {
  length: number;
  activePage: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  length,
  activePage,
}) => {
  return (
    <View style={pagination.main}>
      {Array.from(Array(length), (e, i) =>
        activePage === i ? (
          <Dot key={`dot-${i}`} active={true} />
        ) : (
          <Dot key={`dot-${i}`} />
        )
      )}
    </View>
  );
};

export default Pagination;
