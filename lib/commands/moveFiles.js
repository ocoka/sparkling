import loadData from './dataSources/allFiles'
import rendererFactory from './renderers/file'

export default dependencies => {
	const { store } = dependencies

	const renderer = rendererFactory(dependencies)

	const accept = file => {
		store.dispatch({
			type: 'SHOW_EXTRA_INPUT',
			payload: {
				id: 'sparkling-move-file-confirm',
				originPath: file.value,
				value: file.value
			}
		})
	}

	return {
		loadData,
		accept,
		renderer,
		columns: 3,
		description: 'Move files in project',
		id: 'sparkling-move-files'
	}
}
