import CallToAction from '@/components/common/CallToAction/CallToAction';

export default function NotFound() {
  return (
    <section className="flex h-screen overflow-hidden m-0 p-0">
      <div className="m-auto">
        <h1 className="font-bold text-5xl uppercase mb-6">404 - Not found</h1>
        <h2 className="mb-6 font-semibold">Oops! That page can&apos;t be found</h2>
        <p className="mb-12 text-lg">The page you are looking for it may be deleted or doesn&apos;t exist</p>
        <CallToAction
          url={'/'}
          text={'Back to homepage'}
          isExternal={false}
          hide={false}
          style={'primary'}
        ></CallToAction>
      </div>
    </section>
  );
}
