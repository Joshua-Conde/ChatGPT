'use client'

import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = async () =>
  fetch('/api/getModels')?.then((res) => res?.json())

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR('models', fetchModels)
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  })

  return (
    <Select
      menuPosition="fixed"
      options={model?.modelOptions}
      placeholder={model}
      defaultValue={model}
      isLoading={isLoading}
      isSearchable
      className="mt-2"
      classNames={{
        control: (state) => 'bg-[#434654] border-[#434654]',
      }}
      onChange={(event) => setModel(event?.value)}
    />
  )
}

export default ModelSelection
