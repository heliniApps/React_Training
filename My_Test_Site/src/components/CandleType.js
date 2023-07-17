import FeatureImage from "./FeatureImage";
import FeatureList from "./FeatureList";
import { candleTypeData } from "../model/data.js";

const candleTypeObjects = candleTypeData.map((item, index) => ({
  id: index,
  value: item
}));

const CandleType = () => {
  let component = (
    <div className="candle-features candle-type">
      <h3 className="candle-type-title">Candle Types</h3>
      <FeatureList featureType="type" data={candleTypeObjects} />
      <FeatureImage
        src="./resources/candles-collection-types.avif"
        alt="Different candle types."
      />
    </div>
  );

  return component;
};

export default CandleType;
