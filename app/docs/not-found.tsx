export default function DocsNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 px-6">
      <div className="max-w-md text-center space-y-4">
        <div className="text-4xl font-bold">Page not found</div>
        <p className="text-gray-600">
          The documentation page you are looking for does not exist or may have moved.
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="/docs"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Back to docs
          </a>
          <a
            href="/"
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 transition-colors"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

