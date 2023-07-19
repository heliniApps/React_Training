import FeatureImage from "./FeatureImage";
import FeatureList from "./FeatureList";
import { candleFragranceData } from "../../model/data.js";

const candleFragranceObjects = candleFragranceData.map((item, index) => ({
  id: index,
  value: item
}));

const CandleFragrance = () => {
  let component = (
    <div className="candle-features candle-fragrance">
      <FeatureImage
        src="./resources/pexels-pixabay-207518.jpg"
        alt="Different candle fragrance types."
      />
      <h3 className="candle-fragrance-title">Candle Fragrance</h3>
      <FeatureList featureType="fragrance" data={candleFragranceObjects} />
    </div>
  );

  return component;
};

export default CandleFragrance;
