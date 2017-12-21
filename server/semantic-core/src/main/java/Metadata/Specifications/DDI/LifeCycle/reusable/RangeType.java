//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.reusable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * Indicates the range of items expressed as a string, such as an alphabetic range.
 * <p>
 * <p>Java class for RangeType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="RangeType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="RangeUnit" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}MinimumValue" minOccurs="0"/&gt;
 *         &lt;element ref="{ddi:reusable:3_2}MaximumValue" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RangeType", propOrder = {
        "rangeUnit",
        "minimumValue",
        "maximumValue"
})
@XmlSeeAlso({
        RankingRangeType.class
})
public class RangeType {

    @XmlElement(name = "RangeUnit")
    protected String rangeUnit;
    @XmlElement(name = "MinimumValue")
    protected RangeValueType minimumValue;
    @XmlElement(name = "MaximumValue")
    protected RangeValueType maximumValue;

    /**
     * Gets the value of the rangeUnit property.
     *
     * @return possible object is
     * {@link String }
     */
    public String getRangeUnit() {
        return rangeUnit;
    }

    /**
     * Sets the value of the rangeUnit property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setRangeUnit(String value) {
        this.rangeUnit = value;
    }

    /**
     * Minimum value in the range.
     *
     * @return possible object is
     * {@link RangeValueType }
     */
    public RangeValueType getMinimumValue() {
        return minimumValue;
    }

    /**
     * Sets the value of the minimumValue property.
     *
     * @param value allowed object is
     *              {@link RangeValueType }
     */
    public void setMinimumValue(RangeValueType value) {
        this.minimumValue = value;
    }

    /**
     * Maximum value in the range.
     *
     * @return possible object is
     * {@link RangeValueType }
     */
    public RangeValueType getMaximumValue() {
        return maximumValue;
    }

    /**
     * Sets the value of the maximumValue property.
     *
     * @param value allowed object is
     *              {@link RangeValueType }
     */
    public void setMaximumValue(RangeValueType value) {
        this.maximumValue = value;
    }

}