import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, DraggingStyle, Droppable, DropResult, NotDraggingStyle} from "react-beautiful-dnd";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";

import {PuzzleType} from "../../../../../../types";

const reorder = (list: PuzzleType[], startIndex: number, endIndex: number): PuzzleType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
    background: isDragging ? "#e2e6e3" : "white",
    ...draggableStyle,
});

type Props = {
    data: PuzzleType[],
    setData: (data: PuzzleType[]) => void
};

export const MobilePuzzleComponent = ({data, setData}: Props) => {
    const [questions, setQuestions] = useState<PuzzleType[]>([]);
    useEffect(() => {
        setQuestions(data)
    }, [])

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const movedItems: PuzzleType[] = reorder(
            questions,
            result.source.index,
            result.destination.index
        );
        setData(movedItems);
        setQuestions(movedItems);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                {/* <TableBody> */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                                {questions.map((question, index) => (
                                    <Draggable
                                        key={question.id}
                                        draggableId={"q-" + question.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <TableRow
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <TableCell
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    {question.value}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </TableBody>
                        )}
                    </Droppable>
                </DragDropContext>
                {/* </TableBody> */}
            </Table>
        </TableContainer>
    );
};
