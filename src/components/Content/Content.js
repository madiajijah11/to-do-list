import React, { useEffect, useState } from "react";
import "./Content.css";
import { format } from "date-fns";
import { Image, Card, Col, Row } from "react-bootstrap";
import EmptyActivity from "../../assets/background/empty-activity.png";

const Content = () => {
	const [todos, setTodos] = useState([]);

	const fetchTodos = async () => {
		const response = await fetch(
			"https://todo.api.devcode.gethired.id/activity-groups?email=ivan@skyshi.com"
		);
		const data = await response.json();
		setTodos(data);
	};

	console.log(todos);

	useEffect(() => {
		fetchTodos();
	}, []);

	const tambahActivity = async () => {
		const response = await fetch(
			"https://todo.api.devcode.gethired.id/activity-groups?email=ivan@skyshi.com",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: "New Activity",
				}),
			}
		);
		const data = await response.json();
		setTodos(data);
	};

	return (
		<div className="container">
			<div className="header-content">
				<h1 data-cy="activity-title">Activity</h1>
				<button
					data-cy="activity-add-button"
					onClick={tambahActivity}
					className="btnTambah">
					<i className="bi-plus" />
					Tambah
				</button>
			</div>

			{todos.length === 0 ? (
				<div data-cy="activity-empty-state" className="text-center">
					<Image src={EmptyActivity} alt="empty-activity" onClick={tambahActivity} />
				</div>
			) : (
				<Row xs={1} md={4} className="g-4 pb-5">
					{todos.data.map((todo, index) => (
						<Col key={`todos_${todo.id}`}>
							<Card data-cy={`ativity-item-${index + 1}`} className="shadow-sm">
								<Card.Body>
									<Card.Title>{todo.title}</Card.Title>
									<Card.Text>
										{format(new Date(todo.created_at), "dd MMMM yyyy")}
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			)}
		</div>
	);
};

export default Content;
