// src/components/CardStat.jsx
import { motion } from "framer-motion";

export default function CardStat({ icon, label, value, delay = 0 }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="icon">{icon}</div>
      <div className="info">
        <h2>{value}</h2>
        <p>{label}</p>
      </div>
    </motion.div>
  );
}
