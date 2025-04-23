import { motion } from "framer-motion";

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { width: "w-10", height: "h-5", ball: "w-4 h-4", translate: 16 },
  md: { width: "w-14", height: "h-8", ball: "w-6 h-6", translate: 24 },
  lg: { width: "w-20", height: "h-10", ball: "w-8 h-8", translate: 32 },
};

const Switch = ({ checked, onChange, size = "md" }: SwitchProps) => {
  const { width, height, ball, translate } = sizeConfig[size];

  return (
    <div
      className={`${width} ${height} flex items-center rounded-full p-1 cursor-pointer
        transition-colors duration-300 ${checked ? "bg-blue-500" : "bg-gray-400"}`}
      onClick={onChange}
    >
      {/* Animated Thumb */}
      <motion.div
        className={`${ball} bg-white rounded-full shadow-md`}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        animate={{ x: checked ? translate : 0 }}
      />
    </div>
  );
};

export default Switch;
