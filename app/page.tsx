import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

const HomePage = () => (
  <div className="grid place-content-center place-items-center px-2 h-full text-white text-center w-">
    <h1 className="text-5xl font-bold mb-20 col-span-full">ChatGPT</h1>
    <div className="grid grid-cols-3 gap-2 col-span-full">
      <div className="mb-5">
        <SunIcon className="h-8 w-8 m-auto" />
        <h2 className="mb-4">Examples</h2>
        <div className="space-y-2">
          <p className="infoText">"Explain something to me"</p>
          <p className="infoText">
            "What is the difference between a dog and a cat?"
          </p>
          <p className="infoText">"What is the color of the sun?"</p>
        </div>
      </div>
      <div className="mb-5">
        <BoltIcon className="h-8 w-8 m-auto" />
        <h2 className="mb-4">Capabilities</h2>
        <div className="space-y-2">
          <p className="infoText">Change the ChatGPT Model to use</p>
          <p className="infoText">
            Messages are stored in Firebase's Cloud Firestore
          </p>
          <p className="infoText">
            Hot Toast notifications when ChatGPT is thinking!
          </p>
        </div>
      </div>
      <div className="mb-5">
        <ExclamationTriangleIcon className="h-8 w-8 m-auto" />
        <h2 className="mb-4">Limitations</h2>
        <div className="space-y-2">
          <p className="infoText">
            May occasionally generate incorrect information
          </p>
          <p className="infoText">
            May occasionally produce harmful instructions or biased content
          </p>
          <p className="infoText">
            Limited knowledge of the world and events after 2021
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default HomePage
