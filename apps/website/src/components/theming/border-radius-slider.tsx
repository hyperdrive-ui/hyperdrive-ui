import { type SliderValueChangeDetails } from '@ark-ui/react'
import { type Radius, radii } from '@hyperdrive-ui/panda-preset'
import { Slider } from '~/components/ui/slider'

interface Props {
  radius: Radius
  onValueChange: (value: Radius) => void
}

export const BorderRadiusSlider = (props: Props) => {
  const { radius, onValueChange } = props

  return (
    <Slider
      min={0}
      max={radii.length - 1}
      value={[radii.indexOf(radius)]}
      onValueChange={(e: SliderValueChangeDetails) => onValueChange(radii[e.value[0]])}
      marks={radii.map((borderRadius) => ({
        value: radii.indexOf(borderRadius),
      }))}
    >
      Radius: {radius}
    </Slider>
  )
}
