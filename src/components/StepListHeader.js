/**
 * Компонент приложения, отвечающий за отображение шапки таблицы значений. Родительский компонент App
 *
 */
const StepListHeader = () => {
  return (
    <div className="list-header">
      <h3 className="list-header-date">Дата (ДД.ММ.ГГГГ)</h3>
      <h3 className="list-header-distance">Пройдено км</h3>
      <h3 className="list-header-actions">Действия</h3>
    </div>
  )
}

export default StepListHeader