import { useAppDispatch, useAppSelector } from '../store'
import { increment } from '../store/counterSlice'

export default function Counter() {
  const value = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <button
      className="rounded-full bg-primary px-6 py-3 font-semibold text-on-primary hover:bg-primary-hover"
      onClick={() => dispatch(increment())}
    >
      Count is {value}
    </button>
  )
}
