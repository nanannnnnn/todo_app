"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format, set } from "date-fns";
import Form from "next/form";
import { useState } from "react";

type PriorityType = "high" | "medium" | "low";

interface Todo {
	id: number;
	name: string;
	completed: boolean;
	description?: string;
	editable: boolean;
	dueDate?: Date;
	priority?: PriorityType;
}

type TodoList = Todo[];

export default function Home() {
	const [todoList, setTodoList] = useState<TodoList>([]);
	const [name, setName] = useState<string>("");
	const [dueDate, setDueDate] = useState<Date>();
	const [description, setDescription] = useState<string>("");

	function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
		setName(event.target.value);
	}
	function onChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
		setDescription(event.target.value);
	}
	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setTodoList((prev) => [
			...prev,
			{
				id: prev.length + 1,
				name,
				completed: false,
				description,
				editable: false,
				dueDate,
			},
		]);
		setName("");
		setDescription("");
		setDueDate(undefined);
	}
	function onClickDeleteButton(id: number) {
		setTodoList((prev) => prev.filter((todo) => todo.id !== id));
	}
	function onClickEditButton(id: number) {
		setTodoList((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, editable: !todo.editable } : todo,
			),
		);
	}
	function onChangeEditName(
		event: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) {
		setTodoList((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, name: event.target.value } : todo,
			),
		);
	}
	function onChangeEditDescription(
		event: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) {
		setTodoList((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, description: event.target.value } : todo,
			),
		);
	}
	return (
		<div>
			<Navbar />
			<h1 className="font-bold py-3">Todo List</h1>
			<Form action="" onSubmit={onSubmit} className="flex px-2 gap-2 w-3/5">
				<Input
					type="text"
					placeholder="Name"
					required
					onChange={onChangeName}
					value={name}
				/>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant={"outline"}>
							{dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={dueDate}
							onSelect={setDueDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
				<Input
					type="text"
					placeholder="Description"
					onChange={onChangeDescription}
					value={description}
				/>
				<Button type="submit">Add</Button>
			</Form>
			{todoList.length > 0 && (
				<Table className="mx-auto w-11/12 my-4">
					<TableHeader>
						<TableRow>
							<TableHead className="w-1/12">id</TableHead>
							<TableHead className="w-1/12">completed</TableHead>
							<TableHead className="w-2/12">name</TableHead>
							<TableHead className="w-5/12">description</TableHead>
							<TableHead className="w-1/12">due date</TableHead>
							<TableHead className="w-1/12">delete</TableHead>
							<TableHead className="w-1/12">edit</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{todoList.map((todo) => (
							<TableRow key={todo.id}>
								<TableCell>{todo.id}</TableCell>
								<TableCell>
									<Checkbox
										checked={todo.completed}
										onCheckedChange={() => {
											setTodoList((prev) =>
												prev.map((item) =>
													item.id === todo.id
														? { ...item, completed: !item.completed }
														: item,
												),
											);
										}}
									/>
								</TableCell>
								<TableCell>
									{todo.editable ? (
										<Input
											type="text"
											onChange={(e) => onChangeEditName(e, todo.id)}
											value={todo.name}
										/>
									) : (
										<span>{todo.name}</span>
									)}
								</TableCell>
								<TableCell>
									{todo.editable ? (
										<Input
											type="text"
											onChange={(e) => onChangeEditDescription(e, todo.id)}
											value={todo.description}
										/>
									) : (
										<span>{todo.description}</span>
									)}
								</TableCell>
								<TableCell>
									{todo.dueDate ? format(todo.dueDate, "PPP") : ""}
								</TableCell>
								<TableCell>
									<Button
										type="button"
										className="px-2"
										onClick={() => onClickDeleteButton(todo.id)}
									>
										Delete
									</Button>
								</TableCell>
								<TableCell>
									<Button
										type="button"
										className="px-2"
										onClick={() => onClickEditButton(todo.id)}
									>
										Edit
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
