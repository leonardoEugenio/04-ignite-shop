import Image from "next/image";
import { GetServerSideProps } from "next"
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home";
import { stripe } from "../lib/stripe";
import camiseta1 from '../assets/camisetas/1.png' 
import camiseta2 from '../assets/camisetas/2.png' 
import camiseta3 from '../assets/camisetas/3.png'

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({products}: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map(product => {
        return(
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} alt='camiseta' width={520} height={400}/>
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product> 
        )
      })}
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price
    const priceValue = price.unit_amount != null ? price.unit_amount / 100 : 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceValue,
    }
  })

  return {
    props:{ 
      products
    }
  }
}