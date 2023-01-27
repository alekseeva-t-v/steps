import StepListItem from "./StepListItem"

const StepList = ({data, onDelete, onToggleReplacement}) => {

  const elements = data.map(item => {
    return (
      <StepListItem key={item.id} date={item.date} distance={item.distance} replacement={item.replacement} onDelete={() => onDelete(item.id)} onToggleReplacement={() => onToggleReplacement(item.id)} />
    )
  })

  return (
    <ul className="list list-group">
      {elements}
    </ul>
  )
}

export default StepList