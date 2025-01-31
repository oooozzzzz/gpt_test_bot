let gptContext = {};
let memorySize = 20;

const getMemorySize = () => {
	return memorySize;
};

const setMemorySize = (value) => {
	memorySize = value;
};

const getGPTContext = (id) => {
	if (!gptContext[id]) {
		gptContext[id] = [];
	}
	return gptContext[id];
};

const setGPTContext = (id, value) => {
	gptContext[id] = value;
};

const clearGPTContext = (id) => {
	gptContext[id] = [];
};

const pushToGRPContext = (id, value) => {
	if (!gptContext[id]) {
		gptContext[id] = [];
	}
	gptContext[id].push(value);
};

module.exports = {
	getGPTContext,
	setGPTContext,
	clearGPTContext,
	pushToGRPContext,
	getMemorySize,
  setMemorySize,
};
