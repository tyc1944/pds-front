import React from "react";
import "./clueRate.less"
import { ColorButton } from "components/buttons";
import { Radio, Checkbox } from "antd";
import { StarFilled, DeleteFilled } from "@ant-design/icons";

const ClueRateStar = ({ rate = 0 }: {
    rate: number
}) =>
    <>
        {
            (() => {
                let tmp = []
                for (let i = 0; i < 5; i++) {
                    if (i < rate) {
                        tmp.push(
                            <StarFilled style={{ color: '#FF9800' }} translate="true" key={i} />
                        )
                    } else {
                        tmp.push(
                            <StarFilled style={{}} translate="true" key={i} />
                        )
                    }
                }
                return tmp;
            })()
        }
    </>

const reportWayOptions = [{
    index: 0,
    name: '企业实名'
}, {
    index: 1,
    name: '个人实名'
}, {
    index: 2,
    name: '匿名'
}]

const reportContentOptions = [{
    index: 0,
    name: '详实',
}, {
    index: 1,
    name: '缺失'
}]

const infringerOptions = [{
    index: 0,
    name: '明确',
}, {
    index: 1,
    name: '不明'
}]

const amountInvolvedOptions = [{
    index: 0,
    name: '超过200万元'
}, {
    index: 1,
    name: '超过100万元，不足200万元'
}, {

    index: 2,
    name: '不足100万元'
}]

const clueSourceOptions = [
    { label: '上级交办', value: 0 },
    { label: '党委政府关注', value: 1 },
];

const personalRiskOptions = [
    { label: '涉案人有自杀、自残等状况', value: 0 },
];

const statusOptions = [
    { label: '涉人大代表、政协委员、明主党派等', value: 0 },
    { label: '涉外', value: 1 },
    { label: '涉港澳台', value: 2 },
    { label: '涉军', value: 3 },
];

const publicOpinionRiskOptions = [
    { label: '社会影响极其恶劣或后果极其严重', value: 0 },
    { label: '引起国内、国外媒体关注', value: 1 },
    { label: '可能引起不良影响', value: 2 }
];

const petitionRiskOptions = [
    { label: '有进京上访举报隐患', value: 0 },
    { label: '多人集体举报', value: 1 },
    { label: '多次举报', value: 2 }
];

export interface ClueRateData {
    reportWay: number;
    reportContent: number;
    infringer: number;
    infringementAct: number;
    amountInvolved: number;
    clueSource: number[];
    personalRisk: number[];
    status: number[];
    publicOpinionRisk: number[];
    petitionRisk: number[];
}

export const ClueRate = (props: {
    onGeneratedRate: (rate: number, rateData: ClueRateData) => void
}) => {

    const [reportWay, setReportWay] = React.useState(-1)
    const [reportContent, setReportContent] = React.useState(-1)
    const [infringer, setInfringer] = React.useState(-1)
    const [infringementAct, setInfringementAct] = React.useState(-1)
    const [amountInvolved, setAmountInvolved] = React.useState(-1)
    const [clueSource, setClueSource] = React.useState([] as number[])
    const [personalRisk, setPersonalRisk] = React.useState([] as number[])
    const [status, setStatus] = React.useState([] as number[])
    const [publicOpinionRisk, setPublicOpinionRisk] = React.useState([] as number[])
    const [petitionRisk, setPetitionRisk] = React.useState([] as number[])
    const [rate, setRate] = React.useState(0)
    const submitable = (reportWay !== -1 || reportContent !== -1 || infringer !== -1 || infringementAct !== -1 || amountInvolved !== -1
        || clueSource.length !== 0 || personalRisk.length !== 0 || status.length !== 0 || publicOpinionRisk.length !== 0 || petitionRisk.length !== 0)

    return <div className="clue-rate">
        <div className="clue-rate-category">
            <div className="clue-rate-header">报案信息</div>
            <div className="clue-rate-row">
                <div >举报方式</div>
                <div>
                    <Radio.Group onChange={e => setReportWay(e.target.value)} value={reportWay}>
                        {
                            reportWayOptions.map(item =>
                                <Radio value={item.index} key={item.index}>{item.name}</Radio>
                            )
                        }
                    </Radio.Group>
                </div>
                <div>举报材料</div>
                <div>
                    <Radio.Group onChange={e => setReportContent(e.target.value)} value={reportContent}>
                        {
                            reportContentOptions.map(item =>
                                <Radio value={item.index} key={item.index}>{item.name}</Radio>
                            )
                        }
                    </Radio.Group>
                </div>
            </div>
            <div className="clue-rate-row">
                <div>侵权人</div>
                <div>
                    <Radio.Group onChange={e => setInfringer(e.target.value)} value={infringer}>
                        {
                            infringerOptions.map(item =>
                                <Radio value={item.index} key={item.index}>{item.name}</Radio>
                            )
                        }
                    </Radio.Group>
                </div>
                <div>侵权行为</div>
                <div>
                    <Radio.Group onChange={e => setInfringementAct(e.target.value)} value={infringementAct}>
                        {
                            infringerOptions.map(item =>
                                <Radio value={item.index} key={item.index}>{item.name}</Radio>
                            )
                        }
                    </Radio.Group>
                </div>
            </div>
            <div className="clue-rate-row">
                <div>涉案金额</div>
                <div>
                    <Radio.Group onChange={e => setAmountInvolved(e.target.value)} value={amountInvolved}>
                        {
                            amountInvolvedOptions.map(item =>
                                <Radio value={item.index} key={item.index}>{item.name}</Radio>
                            )
                        }
                    </Radio.Group>
                </div>
            </div>
        </div>
        <div className="clue-rate-category">
            <div className="clue-rate-header">风险信息</div>
            <div className="clue-rate-row">
                <div>线索来源</div>
                <div>
                    <Checkbox.Group
                        value={clueSource}
                        options={clueSourceOptions}
                        onChange={vals => setClueSource(vals as number[])} />
                </div>
                <div>人身风险</div>
                <div>
                    <Checkbox.Group
                        value={personalRisk}
                        options={personalRiskOptions} onChange={vals => setPersonalRisk(vals as number[])} />
                </div>
            </div>
            <div className="clue-rate-row">
                <div>身份情况</div>
                <div>
                    <Checkbox.Group
                        value={status}
                        options={statusOptions} onChange={vals => setStatus(vals as number[])} />
                </div>
            </div>
            <div className="clue-rate-row">
                <div>舆情风险</div>
                <div>
                    <Checkbox.Group
                        value={publicOpinionRisk}
                        options={publicOpinionRiskOptions} onChange={vals => setPublicOpinionRisk(vals as number[])} />
                </div>
            </div>
            <div className="clue-rate-row">
                <div>上访风险</div>
                <div>
                    <Checkbox.Group
                        value={petitionRisk}
                        options={petitionRiskOptions} onChange={vals => setPetitionRisk(vals as number[])} />
                </div>
            </div>
        </div>
        <div className="clue-rate-result">
            <div>线索评级：<span>{rate ? rate : '--'}</span></div>
            <div>
                <div>
                    <ClueRateStar rate={rate}></ClueRateStar>
                </div>
                <div>
                    {
                        submitable &&
                        <>
                            <div>选择结果：
                            {reportWay !== -1 && `举报方式${reportWayOptions.filter(item => item.index === reportWay)[0].name}；`}
                                {reportContent !== -1 && `举报材料${reportContentOptions.filter(item => item.index === reportContent)[0].name}；`}
                                {infringer !== -1 && `侵权人${infringerOptions.filter(item => item.index === infringer)[0].name}；`}
                                {infringementAct !== -1 && `侵权行为${infringerOptions.filter(item => item.index === infringementAct)[0].name}；`}
                                {amountInvolved !== -1 && `涉案金额${amountInvolvedOptions.filter(item => item.index === amountInvolved)[0].name}；`}
                                {clueSource.length !== 0 && `线索来源${clueSourceOptions.filter(item => clueSource.indexOf(item.value) !== -1).map(item => item.label).join("，")}；`}
                                {personalRisk.length !== 0 && `人身风险${personalRiskOptions.filter(item => personalRisk.indexOf(item.value) !== -1).map(item => item.label).join("，")}；`}
                                {status.length !== 0 && `身份情况${statusOptions.filter(item => status.indexOf(item.value) !== -1).map(item => item.label).join("，")}；`}
                                {publicOpinionRisk.length !== 0 && `舆情风险${publicOpinionRiskOptions.filter(item => publicOpinionRisk.indexOf(item.value) !== -1).map(item => item.label).join("，")}；`}
                                {petitionRisk.length !== 0 && `上访风险${petitionRiskOptions.filter(item => petitionRisk.indexOf(item.value) !== -1).map(item => item.label).join("，")}；`}
                            </div>
                            <div onClick={() => {
                                setReportWay(-1);
                                setReportContent(-1);
                                setInfringer(-1);
                                setInfringementAct(-1);
                                setAmountInvolved(-1);
                                setClueSource([]);
                                setPersonalRisk([]);
                                setStatus([]);
                                setPublicOpinionRisk([]);
                                setPetitionRisk([]);
                                setRate(0);
                                props.onGeneratedRate(0, {
                                    reportWay,
                                    reportContent,
                                    infringer,
                                    infringementAct,
                                    amountInvolved,
                                    clueSource,
                                    personalRisk,
                                    status,
                                    publicOpinionRisk,
                                    petitionRisk
                                });
                            }}><DeleteFilled translate="true" />清空选择</div>
                        </>
                    }
                </div>
            </div>
            <div><ColorButton disabled={!submitable} onClick={() => {
                let tmpStar = 0;
                switch (reportWay) {
                    case 0:
                        tmpStar += 3
                        break;
                    case 1:
                        tmpStar += 2
                        break;
                    case 2:
                        tmpStar += 1
                        break;
                }
                switch (reportContent) {
                    case 0:
                        tmpStar += 3;
                        break;
                    case 1:
                        tmpStar += 1;
                        break;
                }

                switch (infringer) {
                    case 0:
                        tmpStar += 3;
                        break;
                    case 1:
                        tmpStar += 1;
                        break;
                }

                switch (infringementAct) {
                    case 0:
                        tmpStar += 3;
                        break;
                    case 1:
                        tmpStar += 1;
                        break;
                }

                switch (amountInvolved) {
                    case 0:
                        tmpStar += 4;
                        break;
                    case 1:
                        tmpStar += 3;
                        break;
                    case 2:
                        tmpStar += 1;
                        break;
                }
                let selectionCount = clueSource.length + personalRisk.length + status.length + publicOpinionRisk.length + petitionRisk.length;
                tmpStar += selectionCount * 4;
                tmpStar = tmpStar > 5 ? 5 : tmpStar;
                setRate(tmpStar);
                props.onGeneratedRate(tmpStar, {
                    reportWay,
                    reportContent,
                    infringer,
                    infringementAct,
                    amountInvolved,
                    clueSource,
                    personalRisk,
                    status,
                    publicOpinionRisk,
                    petitionRisk
                });
            }}>评级</ColorButton></div>
        </div>
    </div>
}

