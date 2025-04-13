export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-serif text-amber-700 mb-6">Auctus Apex Chat</h1>
      <p className="text-stone-800 max-w-2xl mx-auto mb-8">
        This page demonstrates the Voiceflow chat widget in a minimal environment. If the chat widget appears here but
        not on other pages, there might be conflicts with other components or scripts on those pages.
      </p>

      <div className="bg-amber-50 p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <h2 className="text-2xl font-serif text-amber-700 mb-4">Chat Widget Test</h2>
        <p className="text-stone-700 mb-4">
          You should see the Auctus Apex chat widget in the bottom right corner of this page. Try interacting with it to
          ensure it's working properly.
        </p>
        <p className="text-sm text-stone-500">
          If the chat widget is not visible, please check the browser console for any errors.
        </p>
      </div>

      <a
        href="/"
        className="inline-block mt-8 px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
      >
        Return to Homepage
      </a>
    </div>
  )
}
