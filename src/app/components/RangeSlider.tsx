interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  formatValue?: (value: number) => string;
}

export function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  label,
  formatValue = (v) => v.toString()
}: RangeSliderProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3 whitespace-nowrap">
        {label}: {formatValue(value)}
      </label>
      
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 rounded-full border-2 border-gray-800 shadow-inner"></div>
        <div 
          className="absolute h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/50"
          style={{ width: `${percent}%` }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="range-slider"
        />
      </div>
      
      <style>{`
        .range-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          background: transparent;
          position: relative;
          z-index: 10;
          height: 24px;
          cursor: pointer;
          margin: 0;
        }
        
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #f43f5e);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(236, 72, 153, 0.2);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: -9px;
        }
        
        .range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.6), 0 0 0 2px rgba(236, 72, 153, 0.3);
        }
        
        .range-slider::-webkit-slider-thumb:active {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.8), 0 0 0 3px rgba(236, 72, 153, 0.4);
        }
        
        .range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #f43f5e);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(236, 72, 153, 0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .range-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.6), 0 0 0 2px rgba(236, 72, 153, 0.3);
        }
        
        .range-slider::-moz-range-thumb:active {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.8), 0 0 0 3px rgba(236, 72, 153, 0.4);
        }
        
        .range-slider::-webkit-slider-runnable-track {
          background: transparent;
          height: 2px;
        }
        
        .range-slider::-moz-range-track {
          background: transparent;
          height: 2px;
        }
      `}</style>
    </div>
  );
}