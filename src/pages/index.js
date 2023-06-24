import { Inter } from 'next/font/google'
import { ColorModeSwitcher } from '../../components/ColorModeSwitcher'
import Fixed from '../../components/Fixed'
import LandingText from '../../components/Heading'
import CallToActionWithIllustration from '../../components/Hero'
import Feature from '../../components/FeaturePath'
import WithSpeechBubbles from '../../components/Testimonial'
import SplitWithImage from '../../components/Best'
import LargeWithNewsletter from '../../components/Footer'

export default function Home() {
  return (
    <>
    <ColorModeSwitcher/>
      <Fixed/>
      <CallToActionWithIllustration/>
      <Feature/>
      <SplitWithImage/>
      <WithSpeechBubbles/>
      <LargeWithNewsletter/>
    </>
  )
}
