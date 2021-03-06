export const isVisible = state => state.visible
export const getOptions = state => state.options
export const getData = state => state.data
export const getIndex = state => state.index
export const getPattern = state => state.pattern.value
export const getSelectedValue = state =>
	getSparklingData(state)[getIndex(state)]
export const getRawDataLength = state => state.data.length
export const getSparklingData = state => state.sparklingData
export const getFind = state => state.find
export const getReplace = state => state.replace
export const getExtraInput = state => state.extraInput
export const isSmartCase = state => state.smartCase
export const getScope = state => state.scope
export const isLiteralSearch = state => state.literalSearch
export const isWholeWord = state => state.wholeWord
export const getMultiselected = state => state.multiselected
