import { Box } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { dehydrate } from 'react-query'

import { Container } from '../components/Container'
import { SearchStock } from '../components/SearchStock'
import { Sidebar } from '../components/Sidebar'
import { TitlePage } from '../components/TitlePage'
import { getListStock, useListStock } from '../hooks/useListStock'
import { queryClient } from '../services/queryClient'

const Graphic = dynamic(() => import('../components/Graphic'), { ssr: false })
const SideOver = dynamic(() => import('../components/SideOver'))
const Bloomberg = dynamic(() => import('../components/Bloomberg'))

type Props = {
  stock?: string
}

const Home: NextPage = ({ stock }: Props) => {
  const { data, isLoading } = useListStock()

  return (
    <Box w="100vw" height="100vh" d="flex">
      <Head>
        <title>Monetus | Dashboard</title>
      </Head>
      <Sidebar />

      <Container d="flex" flex={1}>
        <TitlePage
          title="Dashboard"
          icon="/icons/dashboard.svg"
          iconLabel="dashboard icon four square"
        />

        <SearchStock />
        {data?.length && <Graphic stock={stock ?? data[0].symbol} />}

        <Bloomberg stocks={data} />
      </Container>

      <SideOver />
    </Box>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await queryClient.prefetchQuery('stocks', getListStock)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      stock: query?.stock ?? null
    }
  }
}
