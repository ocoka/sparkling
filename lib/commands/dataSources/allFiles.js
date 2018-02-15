import { spawn } from 'child_process'

export default onData => {
	const cwd = atom.project.getPaths()[0]
	const cmdProcess = spawn('rg', ['--files'], { cwd })
	cmdProcess.stdout.on('data', data => {
		onData(
			data
				.toString('utf-8')
				.split('\n')
				.filter(s => s.length > 1)
				.map(value => ({ value }))
		)
	})

	return () => {
		cmdProcess.stdin.pause()
		cmdProcess.kill()
	}
}