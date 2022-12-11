import { GetStaticProps } from "next";

type ProductProps = {
    product: {
        id: string 
    }
}

export default function Product({ product }: ProductProps){
    return(
        <h1>Id produto é: {product.id}</h1>
    )
}

const getStaticProps : GetStaticProps<any, {id: string}> = async ({params}) => {
    const productId = params?.id
    return {
        props: {
            product:{
                id: productId
            }
        }
    }
}