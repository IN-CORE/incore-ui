//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.datacollection;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlType;

import Metadata.Specifications.DDI.LifeCycle.reusable.BindingType;
import Metadata.Specifications.DDI.LifeCycle.reusable.InParameterType;
import Metadata.Specifications.DDI.LifeCycle.reusable.NameType;
import Metadata.Specifications.DDI.LifeCycle.reusable.OtherMaterialType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ParameterType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ReferenceType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ResponseCardinalityType;
import Metadata.Specifications.DDI.LifeCycle.reusable.StructuredStringType;
import Metadata.Specifications.DDI.LifeCycle.reusable.VersionableType;


/**
 * A QuestionBlock is a specific structure used in educational and other types of testing where an object (Stimulus RoofSystemMaterial) is provided and a set of questions are asked regarding the object. The QuestionBlock generally has related QuestionBlocks that measure similar skills or aptitudes and is used randomly within a set of questionnaires to create multiple versions of a single questionnaire that can be used with large groups for testing purposes. Assembly of the QuestionBlocks into a questionnaire may the result of selection based on an experimental design model. It contains information on what the QuestionBlock is intended to measure, input and output parameters for the QuestionBlock, a description of the stimulus material and the questions related to it, instructions on sequencing and number of allowed responses, references to external aids and instructions, and an estimate of the time needed to complete the question. Note that the QuestionBlock is a reusable format for use in any number of applied uses. External aids, instructions, response sequencing etc. should contain information consistent with the general use of the QuestionBlock (QuestionItems and QuestionGrids will contain information specific to the individual question). Additional materials and information can be added within the QuestionConstruct which is the applied use of a question.
 * <p>
 * <p>Java class for QuestionBlockType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="QuestionBlockType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{ddi:reusable:3_2}VersionableType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}QuestionBlockName" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}InParameter" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}OutParameter" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}Binding" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}QuestionBlockIntent" minOccurs="0"/&gt;
 *         &lt;choice maxOccurs="unbounded" minOccurs="0"&gt;
 *           &lt;element ref="{ddi:datacollection:3_2}StimulusMaterial"/&gt;
 *           &lt;element ref="{ddi:datacollection:3_2}QuestionItemReference"/&gt;
 *           &lt;element ref="{ddi:datacollection:3_2}QuestionGridReference"/&gt;
 *         &lt;/choice&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}QuestionSequence" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}ResponseCardinality" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}ConceptReference" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}ExternalAid" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;choice maxOccurs="unbounded" minOccurs="0"&gt;
 *           &lt;element ref="{ddi:datacollection:3_2}ExternalInterviewerInstruction"/&gt;
 *           &lt;element ref="{ddi:datacollection:3_2}InterviewerInstructionReference"/&gt;
 *         &lt;/choice&gt;
 *       &lt;/sequence&gt;
 *       &lt;attribute name="estimatedSecondsResponseTime" type="{http://www.w3.org/2001/XMLSchema}decimal" /&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "QuestionBlockType", propOrder = {
        "questionBlockName",
        "inParameter",
        "outParameter",
        "binding",
        "questionBlockIntent",
        "stimulusMaterialOrQuestionItemReferenceOrQuestionGridReference",
        "questionSequence",
        "responseCardinality",
        "conceptReference",
        "externalAid",
        "externalInterviewerInstructionOrInterviewerInstructionReference"
})
public class QuestionBlockType
        extends VersionableType {

    @XmlElement(name = "QuestionBlockName")
    protected List<NameType> questionBlockName;
    @XmlElement(name = "InParameter", namespace = "ddi:reusable:3_2")
    protected List<InParameterType> inParameter;
    @XmlElement(name = "OutParameter", namespace = "ddi:reusable:3_2")
    protected List<ParameterType> outParameter;
    @XmlElement(name = "Binding", namespace = "ddi:reusable:3_2")
    protected List<BindingType> binding;
    @XmlElement(name = "QuestionBlockIntent")
    protected StructuredStringType questionBlockIntent;
    @XmlElementRefs({
            @XmlElementRef(name = "QuestionItemReference", namespace = "ddi:datacollection:3_2", type = JAXBElement.class, required = false),
            @XmlElementRef(name = "StimulusMaterial", namespace = "ddi:datacollection:3_2", type = JAXBElement.class, required = false),
            @XmlElementRef(name = "QuestionGridReference", namespace = "ddi:datacollection:3_2", type = JAXBElement.class, required = false)
    })
    protected List<JAXBElement<?>> stimulusMaterialOrQuestionItemReferenceOrQuestionGridReference;
    @XmlElement(name = "QuestionSequence")
    protected QuestionSequenceType questionSequence;
    @XmlElement(name = "ResponseCardinality", namespace = "ddi:reusable:3_2")
    protected ResponseCardinalityType responseCardinality;
    @XmlElement(name = "ConceptReference", namespace = "ddi:reusable:3_2")
    protected List<ReferenceType> conceptReference;
    @XmlElement(name = "ExternalAid")
    protected List<OtherMaterialType> externalAid;
    @XmlElements({
            @XmlElement(name = "ExternalInterviewerInstruction", type = ExternalInterviewerInstructionType.class),
            @XmlElement(name = "InterviewerInstructionReference", type = InterviewerInstructionReferenceType.class)
    })
    protected List<Object> externalInterviewerInstructionOrInterviewerInstructionReference;
    @XmlAttribute(name = "estimatedSecondsResponseTime")
    protected BigDecimal estimatedSecondsResponseTime;

    /**
     * A name for the QuestionBlock. May be expressed in multiple languages. Repeat the element to express names with different content, for example different names for different systems.Gets the value of the questionBlockName property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the questionBlockName property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getQuestionBlockName().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link NameType }
     */
    public List<NameType> getQuestionBlockName() {
        if (questionBlockName == null) {
            questionBlockName = new ArrayList<NameType>();
        }
        return this.questionBlockName;
    }

    /**
     * Provides an identity for input objects required for the QuestionBlock.Gets the value of the inParameter property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the inParameter property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getInParameter().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link InParameterType }
     */
    public List<InParameterType> getInParameter() {
        if (inParameter == null) {
            inParameter = new ArrayList<InParameterType>();
        }
        return this.inParameter;
    }

    /**
     * Provides an identify for the output objects of the QuestionBlock.Gets the value of the outParameter property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the outParameter property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getOutParameter().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ParameterType }
     */
    public List<ParameterType> getOutParameter() {
        if (outParameter == null) {
            outParameter = new ArrayList<ParameterType>();
        }
        return this.outParameter;
    }

    /**
     * A structure used to bind the content of a parameter declared as the source to a parameter declared as the target. For example, binding the OutParameter of one Question to the InParameter of another Question in order to personalize a question text. Care should be taken to bind only reusable information at this level. Binding is also available at the QuestionConstruct to reflect bindings particular to the use of the question in a specific question flow or instrument.Gets the value of the binding property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the binding property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getBinding().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link BindingType }
     */
    public List<BindingType> getBinding() {
        if (binding == null) {
            binding = new ArrayList<BindingType>();
        }
        return this.binding;
    }

    /**
     * The purpose of the QuestionBlock in terms of what it is designed to test. May contain information on specific aspects of the Block and its construction.
     *
     * @return possible object is
     * {@link StructuredStringType }
     */
    public StructuredStringType getQuestionBlockIntent() {
        return questionBlockIntent;
    }

    /**
     * Sets the value of the questionBlockIntent property.
     *
     * @param value allowed object is
     *              {@link StructuredStringType }
     */
    public void setQuestionBlockIntent(StructuredStringType value) {
        this.questionBlockIntent = value;
    }

    /**
     * Gets the value of the stimulusMaterialOrQuestionItemReferenceOrQuestionGridReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the stimulusMaterialOrQuestionItemReferenceOrQuestionGridReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getStimulusMaterialOrQuestionItemReferenceOrQuestionGridReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link JAXBElement }{@code <}{@link ReferenceType }{@code >}
     * {@link JAXBElement }{@code <}{@link OtherMaterialType }{@code >}
     * {@link JAXBElement }{@code <}{@link ReferenceType }{@code >}
     */
    public List<JAXBElement<?>> getStimulusMaterialOrQuestionItemReferenceOrQuestionGridReference() {
        if (stimulusMaterialOrQuestionItemReferenceOrQuestionGridReference == null) {
            stimulusMaterialOrQuestionItemReferenceOrQuestionGridReference = new ArrayList<JAXBElement<?>>();
        }
        return this.stimulusMaterialOrQuestionItemReferenceOrQuestionGridReference;
    }

    /**
     * Allows for recommending that the sequence of questions should vary according to a specified pattern, i.e., random, rotation, etc.
     *
     * @return possible object is
     * {@link QuestionSequenceType }
     */
    public QuestionSequenceType getQuestionSequence() {
        return questionSequence;
    }

    /**
     * Sets the value of the questionSequence property.
     *
     * @param value allowed object is
     *              {@link QuestionSequenceType }
     */
    public void setQuestionSequence(QuestionSequenceType value) {
        this.questionSequence = value;
    }

    /**
     * Indicates the minimum and maximum number of responses to expect from the QuestionBlock.
     *
     * @return possible object is
     * {@link ResponseCardinalityType }
     */
    public ResponseCardinalityType getResponseCardinality() {
        return responseCardinality;
    }

    /**
     * Sets the value of the responseCardinality property.
     *
     * @param value allowed object is
     *              {@link ResponseCardinalityType }
     */
    public void setResponseCardinality(ResponseCardinalityType value) {
        this.responseCardinality = value;
    }

    /**
     * A reference to the concept the QuestionBlock is intended to gather data on.Gets the value of the conceptReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the conceptReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getConceptReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ReferenceType }
     */
    public List<ReferenceType> getConceptReference() {
        if (conceptReference == null) {
            conceptReference = new ArrayList<ReferenceType>();
        }
        return this.conceptReference;
    }

    /**
     * A pointer to an external aid presented by the instrument such as a text card, image, audio, or audiovisual aid. Typically a URN. Use type attribute to describe the type of external aid provided. Example of terms to use would include: imageOnly audioOnly audioVisual multiMedia.Gets the value of the externalAid property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the externalAid property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getExternalAid().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link OtherMaterialType }
     */
    public List<OtherMaterialType> getExternalAid() {
        if (externalAid == null) {
            externalAid = new ArrayList<OtherMaterialType>();
        }
        return this.externalAid;
    }

    /**
     * Gets the value of the externalInterviewerInstructionOrInterviewerInstructionReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the externalInterviewerInstructionOrInterviewerInstructionReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getExternalInterviewerInstructionOrInterviewerInstructionReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ExternalInterviewerInstructionType }
     * {@link InterviewerInstructionReferenceType }
     */
    public List<Object> getExternalInterviewerInstructionOrInterviewerInstructionReference() {
        if (externalInterviewerInstructionOrInterviewerInstructionReference == null) {
            externalInterviewerInstructionOrInterviewerInstructionReference = new ArrayList<Object>();
        }
        return this.externalInterviewerInstructionOrInterviewerInstructionReference;
    }

    /**
     * Gets the value of the estimatedSecondsResponseTime property.
     *
     * @return possible object is
     * {@link BigDecimal }
     */
    public BigDecimal getEstimatedSecondsResponseTime() {
        return estimatedSecondsResponseTime;
    }

    /**
     * Sets the value of the estimatedSecondsResponseTime property.
     *
     * @param value allowed object is
     *              {@link BigDecimal }
     */
    public void setEstimatedSecondsResponseTime(BigDecimal value) {
        this.estimatedSecondsResponseTime = value;
    }

}