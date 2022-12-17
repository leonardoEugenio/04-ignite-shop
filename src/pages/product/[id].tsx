import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>
        
      </ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,80</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores architecto obcaecati maxime itaque rem exercitationem quos reprehenderit, inventore veniam nisi nulla vero molestiae assumenda laudantium voluptas dolore nesciunt illo expedita.</p>

        <button>Comprar Agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}