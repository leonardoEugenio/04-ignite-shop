import axios from "axios"
import {useState} from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string
  }
}

export default function Product({product}: ProductProps) {
  const [isCreationChekoutSession, setIsCreationChekoutSession] = useState<boolean>(false)
  async function handleBuyProduct() {


    try {
      setIsCreationChekoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreationChekoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreationChekoutSession} onClick={handleBuyProduct}>Comprar Agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: {id: 'prod_MtQqly3ScBSXni'} }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id != undefined ? params.id : "undefined";
  const product = await stripe.products.retrieve(productId,{ 
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price
  const priceValue = price.unit_amount != null ? price.unit_amount / 100 : 0
     
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-br',{
          style: 'currency',
          currency: 'BRL'
        }).format(priceValue),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 //1 hour
  }
}