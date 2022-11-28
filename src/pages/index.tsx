import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import camiseta1 from '../assets/camisetas/1.png' 
import camiseta2 from '../assets/camisetas/2.png' 
import camiseta3 from '../assets/camisetas/3.png' 
export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} alt='camiseta' width={520} height={400}/>
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={camiseta2} alt='camiseta' width={520} height={400}/>
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}