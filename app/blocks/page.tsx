import BlocksList from '@/components/blocks-list'
import PageTitle from '@/components/page-title'

export default async function BlocksPage() {
  return (
    <>
      <main className="p-4">
        <PageTitle title="Blocks" />
        <BlocksList className="mt-4" />
      </main>
    </>
  )
}
