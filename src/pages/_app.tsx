import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'
import Image from "next/image"

globalStyles() // o da aula está dentro da função

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Logo" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
