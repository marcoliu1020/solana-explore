import BlocksList from '@/components/blocks-list'
import PageTitle from '@/components/page-title'

export default async function BlocksPage() {
  return (
    <>
      <main className="mx-auto max-w-screen-lg p-4">
        <PageTitle title="Blocks" />
        <BlocksList className="mt-2" />
      </main>
    </>
  )
}
