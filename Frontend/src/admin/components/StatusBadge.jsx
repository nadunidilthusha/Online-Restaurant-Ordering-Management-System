const LABELS = { new: 'New', preparing: 'Preparing', on_the_way: 'On the way', completed: 'Completed', cancelled: 'Cancelled', live: 'Live', review: 'Review' };

export default function StatusBadge({ status }) {
  return <span className={`badge s-${status}`}>{LABELS[status] || status}</span>;
}
