import { ChangeEvent } from "react";

interface RangeProps {
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  step?: number;
  label?: string;
  labels?: { [index: number]: string };
  value?: number;
  setValue?: (value: number) => void;
}

function Range({
  min = 0,
  max = 3,
  initialValue = 3,
  onChange,
  step = 1,
  labels = { 0: "N", 1: "S", 2: "G", 3: "E" },
  label = "",
  value = initialValue,
  setValue = (value: number) => {console.log(value)},
}: RangeProps) {
  // const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const renderLabels = () => {
    const labelElements = [];
    const stepWidth = 100 / (max - min);

    for (const index in labels) {
      labelElements.push(
        <div
          key={index}
          className="relative text-sm text-gray-600 flex-none w-auto"
          style={{
            flexGrow: parseInt(index) === min ? 0 : 1,
            flexBasis: `${stepWidth}%`,
          }}
        >
          <span className="absolute transform -translate-x-1/2">
            {labels[index]}
          </span>
        </div>
      );
    }
    return labelElements;
  };

  return (
    <div className="w-full relative">
      <label className="block text-sm font-medium leading-6 text-gray-900 mt-3">
        {label}
      </label>
      <div className="h-0 top-0 flex items-center justify-between px-2">
        {renderLabels()}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-3.5 bg-gray-200 appearance-none outline-none cursor-pointer rounded-full mt-6"
        style={{
          backgroundImage: `linear-gradient(to right, #6366F1 0%, #6366F1 ${
            ((value - min) / (max - min)) * 100
          }%, #E5E7EB ${((value - min) / (max - min)) * 100}%, #E5E7EB 100%)`,
          height: "0.5rem",
        }}
      />
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          background: #6366F1;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 150ms;
        }
        input[type=range]:focus::-webkit-slider-thumb {
          background: #4F46E5;
        }
        input[type=range]::-moz-range-thumb {
          background: #6366F1;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 150ms;
        }
        input[type=range]:focus::-moz-range-thumb {
          background: #4F46E5;
        }
      `}</style>
    </div>
  );
}

export default Range;
