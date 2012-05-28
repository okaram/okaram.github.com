var board1=[
	[1,0,0,0,1],
	[0,1,0,1,0],
	[0,0,0,0,0],
	[0,1,0,1,0],
	[1,0,0,0,1],
];


// Overall viewmodel for this screen, along with initial state
function LightsOutViewModel(b) {
    var self = this;

	self.board=[];
	for(var row=0; row<b.length; ++row) {
		oa=[]
		for(var col=0; col<b[0].length; ++ col)
			oa.push(new ko.observable(b[row][col]))
		self.board.push(oa);
	}
	
	self.flipSquare =function(row,col){
		if(row>=0 && row<self.board.length && col>=0 && col<self.board[0].length)
			self.board[row][col] (1-self.board[row][col]());
	}
	
	self.allSet= function() {
		for(var row=0; row<self.board.length; ++row) 
			for(var col=0; col<self.board[0].length; ++ col) 
				if(self.board[row][col]()==1)
					return false;
		return true;
	}

	self.btnClicker  = function(row, col) {
		return function(item) {
			self.flipSquare(row,col);
			self.flipSquare(row-1,col);
			self.flipSquare(row+1,col);
			self.flipSquare(row,col-1);
			self.flipSquare(row,col+1);
			if(self.allSet()) {
				alert('great job !');
			}
		}
	}
}
