import loadData from './dataSources/allLines'
import renderer from './renderers/line'
import commandFactory from './commandFactory'

export const autocompleteLinesFactory = (h, store) => {
	const accept = item => {
		store.dispatch({ type: 'HIDE' })
		const editor = atom.workspace.getActiveTextEditor()
		editor.insertText(item.line)
	}

	return { loadData, accept, renderer }
}

export default commandFactory(autocompleteLinesFactory)