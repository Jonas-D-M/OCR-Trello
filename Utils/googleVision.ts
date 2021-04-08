import Environment from "../config/environment";

export default (function () {
  const sendImageToGoogle = async (image: any) => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });

      const response = await fetch(
        "https://eu-vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  return { sendImageToGoogle };
})();
