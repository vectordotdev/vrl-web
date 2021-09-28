import { state } from "../state";

export const Drawer = () => {
  const toggleDrawer: () => void = state.store(s => s.toggleDrawer);

  return <aside className="drawer" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                    Vector Remap Language
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={toggleDrawer}
                      type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">
                        Close panel
                      </span>
                
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-4 px-6">
                <p>
                  Content
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
}