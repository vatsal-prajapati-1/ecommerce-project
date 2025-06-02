interface IconWithBadgeProps {
  icon: React.ReactNode;
  count: number;
}

const IconWithBadge: React.FC<IconWithBadgeProps> = ({ icon, count }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {icon}
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default IconWithBadge;
