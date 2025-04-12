import {formatData} from './constants'

const CustomToolbar = ({
  className,
}: {
  className?: string;
}) => (
  <div id='toolbar' className={className}>
    {formatData.map(({className, value, key}) => (
      <button key={key} className={className} value={value}/>
    ))}
  </div>
)

export default CustomToolbar;