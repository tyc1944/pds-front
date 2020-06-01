import React from "react";
import { inject, observer } from "mobx-react";
import MainStore from "stores/mainStore";

interface ModifyPasswordProps {
    main: MainStore
}

@inject("main")
@observer
class ModifyPassword extends React.Component<ModifyPasswordProps> {
    render() {
        return <div></div>
    }
}

export default ModifyPassword;