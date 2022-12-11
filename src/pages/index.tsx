import Image from "next/image";
import { GetStaticProps } from "next"
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import 'keen-slider/keen-slider.min.css'
import { styled } from "@stitches/react";
import Link from "next/link";

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
          <Link href={`product/${product.id}`} key={product.id}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} alt='camiseta' width={520} height={400}/>
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product> 
          </Link>
        )
      })}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
      price: new Intl.NumberFormat('pt-br',{
        style: 'currency',
        currency: 'BRL'
      }).format(priceValue),
    }
  })

  return {
    props:{ 
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}