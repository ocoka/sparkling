import reducersFactory from '../reducers'

const fromSelectorFactory = ({ store, Observable }) => selector =>
	Observable.create(observer => {
		return store.subscribe(() => {
			const state = store.getState()
			const selectedState = selector(state)
			observer.next(selectedState)
		})
	}).distinctUntilChanged()

const fromActionFactory = ({ store, Observable }) => {
	const oldDispatch = store.dispatch

	const subscriptions = new Set()

	const subscribe = event => {
		subscriptions.add(event)

		return () => {
			subscriptions.delete(event)
		}
	}

	const newDispatch = action => {
		// console.log('action: ', action)
		if (typeof action === 'function') {
			action(newDispatch, store.getState)
		} else {
			// console.log('action: ', action)
			oldDispatch(action)

			for (const subscription of subscriptions) {
				const { actionType, observer } = subscription

				if (actionType === action.type) {
					observer.next(actionType)
				}
			}
		}
	}

	store.dispatch = newDispatch

	return actionType =>
		Observable.create(observer => {
			return subscribe({ actionType, observer })
		})
}

export default function storeFactory({
	Observable,
	createStore,
	combineReducers
}) {
	const reducers = reducersFactory({ combineReducers })
	const store = createStore(reducers)
	const fromAction = fromActionFactory({ store, Observable })
	const fromSelector = fromSelectorFactory({ store, Observable })
	store.fromSelector = fromSelector
	store.fromAction = fromAction
	// store.subscribe(() => {
	// 	console.log(store.getState())
	// })

	return store
}