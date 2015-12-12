def loadFile(filename)
  fin = File.open(filename,'r')
  contents = fin.read
  fin.close
  return contents
end

def saveFile(filename, contents)
  fout = File.open(filename, 'w')
  fout.puts contents
  fout.close
end

contents = ''
files = [
         'piece.js',
         'rook.js',
         'pawn.js',
         'bishop.js',
         'knight.js',
         'queen.js',
         'king.js',
         'board.js'
        ]
files.each do |name|
  if(File.extname(name) == '.js')
    contents += "\n" + loadFile(name)
  end
end

saveFile('piece_library.js', contents)
