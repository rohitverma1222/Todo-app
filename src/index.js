import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';

class Addtask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskDesc: '',
        }
    }
    handleTaskTextChange(e) {

        this.setState({
            taskDesc: e.target.value,
        });

    }
    handleAddTaskClick() {
        if (this.state.taskDesc.length > 0 && this.state.taskDesc.length < 20) {
            this.props.handlertoCollectTaskInfo(this.state.taskDesc);
        }
        this.setState({
            taskDesc: '',
        });
    }
    render() {
        return (
            <>
            <div className="header">    
            <h2>
                <p>Todo-App</p>
            </h2>
            </div>
                <form>
                    <input type="text" value={this.state.taskDesc} onChange={(e) => this.handleTaskTextChange(e)} />
                    <input type="button" value="Add task" onClick={() => this.handleAddTaskClick()} />
                </form>
            </>
        )
    }
}



class List extends React.Component {
    handleOperationChange(task) {
        this.props.handlertoCollectTaskInfo(task);
    }
    deletetask(task)
    {
        this.props.deletetaskFromState(task);
    }
    render() {
        let list = [];

        for (let i = 0; i < this.props.tasks.length; i++) {
            let tasks = this.props.tasks[i];
            let spanAction;
            if (tasks.isfinished) {
                spanAction = (
                    <span class="material-icons icons" onClick={() => this.handleOperationChange(tasks.desc)}>close</span>
                );
            }
            else {
                spanAction = (
                    <>
                        <span class="material-icons icons" onClick={() => this.handleOperationChange(tasks.desc)}>done</span>
                        <span class="material-icons icons" onClick={() => this.deletetask(tasks.desc)}>delete</span>
                    </>

                );
            }
            let listItem = (
                <div key={i} className="task">
                    <span className='task-desc'>{tasks.desc}</span>
                    {spanAction}
                </div>
            );
            list.push(listItem);
        }
        return (
            <div className={this.props.forstyling}>
                <div className='title'>{this.props.purpose}</div>
                <hr />
                <div className='content'>
                    {list}
                </div>
            </div>
        )
    }
}
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [{}]
        }
    }
    handleNewTask(taskDesc) {
        let oldtasks = this.state.tasks.slice();
        oldtasks.push({
            desc: taskDesc,
            isfinished: false,
        })
        this.setState({
            tasks: oldtasks
        })
    }
    handleSwapOperation(task, status) {
        let oldtasks = this.state.tasks.slice();

        let Item = oldtasks.find(ot => ot.desc === task)
        Item.isfinished = status;

        this.setState({
            tasks: oldtasks
        });
    }
    deletetaskInState(task)
    {
        let oldtasks=this.state.tasks.slice();

        let newtask=oldtasks.filter(ot=>ot.desc!==task)
        this.setState({
            tasks:newtask
        });
    }
    render() {
        let tasks = this.state.tasks;
        let todoTask = tasks.filter(t => t.isfinished === false);
        let finishedtask = tasks.filter(t => t.isfinished === true);

        return (
            <>
                <div className='Add-task'>
                    <Addtask handlertoCollectTaskInfo={(taskDesc) => this.handleNewTask(taskDesc)} />
                </div>
                <div className='List'>
                    <List tasks={todoTask} deletetaskFromState ={(task)=> this.deletetaskInState(task)} handlertoCollectTaskInfo={(task) => this.handleSwapOperation(task, true)} purpose="todo" forstyling="todo" />
                    <List tasks={finishedtask}  handlertoCollectTaskInfo={(task) => this.handleSwapOperation(task, false)} purpose="finished" forstyling="finished" />
                </div>
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
