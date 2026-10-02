const EmptyState = ({
  title = "Nothing here yet",
  message = "There is nothing to display right now.",
  action,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">○</div>
      <h3>{title}</h3>
      <p>{message}</p>

      {action && <div className="empty-action">{action}</div>}
    </div>
  );
};

export default EmptyState;