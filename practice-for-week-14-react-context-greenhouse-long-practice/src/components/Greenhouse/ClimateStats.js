import './ClimateStats.css';
import { useClimate } from '../../context/ClimateContext';
import { useEffect, useState } from 'react';
import ReactSlider from 'react-slider'; // Import the Slider component from the appropriate library

function ClimateStats() {
  const { temp, setTemp, humidity } = useClimate();
  const [desiredTemp, setDesiredTemp] = useState(temp);

  useEffect(() => {
    const fetchTemp = setTimeout(() => {
      if (desiredTemp < temp) {
        setTemp(temp - 1);
      } else if (desiredTemp > temp) {
        setTemp(temp + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(fetchTemp);
    };
  }, [desiredTemp, setTemp, temp]);

  const handleSliderChange = value => {
    setDesiredTemp(value);
  };

  return (
    <div className="climate-stats">
      <div className="temperature">Temperature {temp}°F</div>
      <div className="humidity">Humidity {humidity}%</div>
      <ReactSlider
        value={desiredTemp}
        onAfterChange={handleSliderChange}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel="Thermometer"
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => <div {...props} index={state.index} />}
        invert
        pearling
        minDistance={1}
      />
    </div>
  );
}

export default ClimateStats;
