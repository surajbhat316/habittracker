import { useParams } from "react-router-dom"

export default function HabitTimeLine() {

  const {name} = useParams();
  console.log(name);
  return (
    <div>HabitTimeLine</div>
  )
}
