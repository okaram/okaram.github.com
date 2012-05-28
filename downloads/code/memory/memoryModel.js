var board1=[
	['A','a','B','b','C','c'],
	['D','d','E','e','F','f'],
	['G','g','H','h','I','i'],
];


function copy2DArray(arr) {
	var a=[]
	for(var row=0; row<arr.length; ++row) {
		a2=[]
		for(var col=0; col<arr[0].length; ++ col)
			a2.push(arr[row][col])
		a.push(a2);
	}
	return a;
}

function randomize2DArray(arr, times) {
	for(var i=0; i<times; ++i) {
		var r1=Math.floor(Math.random()*arr.length);
		var r2=Math.floor(Math.random()*arr.length);
		var c1=Math.floor(Math.random()*arr[0].length);
		var c2=Math.floor(Math.random()*arr[0].length);
		tmp=arr[r1][c1];
		arr[r1][c1]=arr[r2][c2];
		arr[r2][c2]=tmp;
	}
}

// Overall viewmodel for this screen, along with initial state
function myViewModel(board) {
	
    var self = this;
	self.board=copy2DArray(board);
	randomize2DArray(self.board,15);
	self.mBoard=[];
	for(var row=0; row<board.length; ++row) {
		oa=[]
		for(var col=0; col<board[0].length; ++ col)
			oa.push(new ko.observable(''))
		self.mBoard.push(oa);
	}
	self.responsive=true;
	self.prow=-1;
	self.pcol=-1;
	self.status=0;
	

	self.btnClicker  = function(row, col) {
		return function(item) {
			if(!self.responsive || (row==self.prow && col==self.pcol))
				return;
			self.mBoard[row][col](self.board[row][col]);
			if(self.status==0) { // starting
				self.prow=row;
				self.pcol=col;
				self.status=1;
			} else if (self.status==1) {
				
				f=function() {
					if(self.board[row][col].toLowerCase()==self.board[self.prow][self.pcol].toLowerCase()) {
						self.mBoard[self.prow][self.pcol](' ');
						self.mBoard[row][col](' ');
					} else {
						self.mBoard[self.prow][self.pcol]('');
						self.mBoard[row][col]('');
					}
					self.status=0;
					self.responsive=true;
				};
				
				self.responsive=false;
				window.setTimeout(f,1000);
				
			}
		}
	}
	
    
}

