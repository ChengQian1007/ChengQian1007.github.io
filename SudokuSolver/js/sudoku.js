// *************************************************************************************************
// * Sudoku Solver
// * Created by: Cheng Qian
// * Version: 0.7
// *************************************************************************************************
class Sudoku {
	constructor(iQuiz = "", iSolution = "") {
		this.quiz = iQuiz;
		this.solution = iSolution;

		this.cells = [];
		this.rows = [];
		this.columns = [];
		this.blocks = [];

		this._initialize();

		if (this.quiz != "") {
			this._setQuizToCells();
		}
	}

	_initialize() {
		// Create rows, columns and blocks:
		for (let i = 0; i < 9; i++) {
			this.rows.push(new SudokuRow(i));
			this.columns.push(new SudokuColumn(i));
			this.blocks.push(new SudokuBlock(i));
		}

		// Create cells:
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.cells.push(new SudokuCell(i, j));
			}
		}

		// Create relations between cells, rows, columns and blocks:
		this.cells.forEach(function (cell) {
			var relatedRow = this.getRowByIndex(cell.rowIndex);
			var relatedColumn = this.getColumnByIndex(cell.columnIndex);
			var relatedBlock = this.getBlockByRowAndColumn(cell.rowIndex, cell.columnIndex);

			cell.row = relatedRow;
			cell.column = relatedColumn;
			cell.block = relatedBlock;

			relatedRow.appendCell(cell);
			relatedColumn.appendCell(cell);
			relatedBlock.appendCell(cell);
		}.bind(this));
	}

	getRowByIndex(iIndex) {
		return this.rows.find(function (row) {
			return row.index == iIndex;
		});
	}

	getColumnByIndex(iIndex) {
		return this.columns.find(function (column) {
			return column.index == iIndex;
		});
	}

	getBlockByIndex(iIndex) {
		return this.blocks.find(function (block) {
			return block.index == iIndex;
		});
	}

	getBlockIndexByRowAndColumn(iRowIndex, iColumnIndex) {
		return Math.floor(iRowIndex / 3) * 3 + Math.floor(iColumnIndex / 3);
	}

	getBlockByRowAndColumn(iRowIndex, iColumnIndex) {
		return this.getBlockByIndex(this.getBlockIndexByRowAndColumn(iRowIndex, iColumnIndex));
	}

	get solved() {
		return this.rows.every(function (row) {
			return row.solved;
		});
	}

	setQuiz(iQuiz) {
		this.quiz = iQuiz;
		this._setQuizToCells();
	}

	_setQuizToCells() {
		this._resetCells();

		let aQuiz = this.quiz.split("");

		aQuiz.forEach(function (str, index) {
			let value = parseInt(str);

			if (value > 0) {
				this.cells[index].setQuizValue(value);
			}
		}.bind(this));
	}

	_resetCells() {
		this.cells.forEach(function (cell) {
			cell.resetContent();
		});
	}

	getCurrentSolution() {
		return this.cells.reduce(function (solution, cell) {
			return solution + cell.value.toString();
		}, "");
	}

	checkCurrentSolution() {
		return this.solution ? (this.solution == this.getCurrentSolution()) : "Unknown";
	}

	solveIteration() {
		let subsetSolveIteration = function (subset) {
			subset.checkAndSetUniqueCandidate();
		}

		this.rows.forEach(subsetSolveIteration);
		this.columns.forEach(subsetSolveIteration);
		this.blocks.forEach(subsetSolveIteration);
	}

	solve() {
		let iterationTimes = 0;

		while (!this.solved) {
			this.solveIteration();
			iterationTimes++;

			if (iterationTimes > 81) {
				return "Need more algorithum. May be Multi Answer";
			}
		}

		return iterationTimes;
	}

	createHTMLTable(iDom, iFillQuiz = true) {
		let oTable = document.createElement('table');
		oTable.className = "SudokuTable";

		this.rows.forEach(function (row) {
			let oTableRow = oTable.insertRow(-1);
			row.oDom = oTableRow;

			row.cells.forEach(function (cell) {
				let oTableCell = oTableRow.insertCell(-1);
				cell.oDom = oTableCell;
			});
		});

		iDom.appendChild(oTable);

		if (iFillQuiz == true) {
			this._setQuizToCells();
		}

		return oTable;
	}

}

class SudokuSubset {
	constructor(iIndex, iType) {
		this.index = iIndex;
		this.type = iType;
		this.cells = [];
	}

	get solved() {
		return this.cells.every(function (cell) {
			return cell.solved;
		});
	}

	appendCell(cell) {
		this.cells.push(cell);
	}

	removeValueFromCandidatesInSubset(iValue) {
		this.cells.forEach(function (cell) {
			cell.removeValueFromCandidates(iValue);
		});
	}

	checkAndSetUniqueCandidate() {
		var heatMap = [null, [],
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		];

		this.cells.forEach(function (cell) {
			cell.reportCandidates(heatMap);
		});

		heatMap.forEach(function (candidateCells, candidate) {
			if (candidateCells != null) {
				if (candidateCells.length == 1) {
					if (candidateCells[0].solved != true) {
						candidateCells[0].setSolutionValue(candidate);
					}
				}
			}
		});
	}
}

class SudokuRow extends SudokuSubset {
	constructor(iRowIndex) {
		super(iRowIndex, "row");

		this.oDom = null;
	}
}

class SudokuColumn extends SudokuSubset {
	constructor(iColumnIndex) {
		super(iColumnIndex, "column");
	}
}

class SudokuBlock extends SudokuSubset {
	constructor(iBlockIndex) {
		super(iBlockIndex, "block");
	}
}

class SudokuCell {
	constructor(iRowIndex, iColumnIndex, iValue = 0) {
		this.rowIndex = iRowIndex;
		this.columnIndex = iColumnIndex;

		this.row = null;
		this.column = null;
		this.block = null;

		this.oDom = null;

		this.value = iValue;
		this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		this.solved = false;
		this.isQuiz = false;
	}

	resetContent() {
		this.value = 0;
		this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		this.solved = false;
		this.isQuiz = false;

		this.writeDomOnNeed();
	}

	setQuizValue(iValue) {
		this.resetContent();
		this.isQuiz = true;
		this.setSolutionValue(iValue);
	}

	setSolutionValue(iValue) {
		this.value = iValue;
		this.candidates = [];
		this.solved = true;

		this.row.removeValueFromCandidatesInSubset(iValue);
		this.column.removeValueFromCandidatesInSubset(iValue);
		this.block.removeValueFromCandidatesInSubset(iValue);

		this.writeDomOnNeed();
	}

	removeValueFromCandidates(iValue) {
		let pos = this.candidates.indexOf(iValue);
		if (pos != -1) {
			this.candidates.splice(pos, 1);
		}

		if (this.candidates.length == 1) {
			this.setSolutionValue(this.candidates[0]);
		}

		this.writeDomOnNeed();
	}

	reportCandidates(iHeatMap) {
		this.candidates.forEach(function (candidate) {
			iHeatMap[candidate].push(this);
		}.bind(this));
	}

	writeDomOnNeed() {
		if (this.oDom) {
			this.oDom.className = "";

			if (this.isQuiz) {
				this.oDom.classList.add("isQuiz");
				this.oDom.innerHTML = this.value;
			} else {
				if (this.solved) {
					this.oDom.classList.add("solved");
					this.oDom.innerHTML = this.value;
				} else {
					this.oDom.classList.add("candidatesList");
					this.oDom.innerHTML = this.candidates.toString();
				}
			}
		}
	}
}