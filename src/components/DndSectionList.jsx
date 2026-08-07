import { useRef } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GripVertical } from 'lucide-react'

const ItemTypes = { CARD: 'card' }

function DraggableCard({ index, moveCard, children, id }) {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })
  // eslint-disable-next-line react-hooks/refs
  drag(drop(ref))
  return (
    <div
      ref={ref}
      className={`relative ${isDragging ? 'opacity-40' : 'opacity-100'}`}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-move text-gray-500 hover:text-white">
        <GripVertical className="w-5 h-5" />
      </div>
      {children}
    </div>
  )
}

export function DndSectionList({ items, onReorder, renderItem }) {
  const moveCard = (from, to) => onReorder(from, to)
  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item, index) => (
        <DraggableCard
          key={item.id ?? index}
          index={index}
          id={item.id ?? index}
          moveCard={moveCard}
        >
          {renderItem(item, index)}
        </DraggableCard>
      ))}
    </DndProvider>
  )
}
